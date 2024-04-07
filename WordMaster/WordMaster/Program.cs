using Microsoft.EntityFrameworkCore;
using WordMaster.Database;
using WordMaster.Middleware;
using WordMaster.Seeders;
using WordMaster.Services;

namespace WordMaster
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();

            if (builder.Environment.IsDevelopment())
            {
                builder.Services.AddDbContext<MyDbContext>(options => options.UseInMemoryDatabase("MemoryDatabase"));
            }

            builder.Services.AddDbContext<MyDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("WordMasterConnectionString")));

            builder.Services.AddScoped<ErrorHandlingMiddleware>();
            builder.Services.AddScoped<IWordService, WordService>();
            builder.Services.AddScoped<IWordSeeder, WordSeeder>();

            var app = builder.Build();

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseMiddleware<ErrorHandlingMiddleware>();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var seeder = services.GetRequiredService<IWordSeeder>();
                seeder.AddWords();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
