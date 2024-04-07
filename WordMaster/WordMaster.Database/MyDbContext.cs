using Microsoft.EntityFrameworkCore;
using WordMaster.Database.Entities;

namespace WordMaster.Database
{
    public class MyDbContext : DbContext
    {
        public DbSet<Word> Words { get; set; }
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
    }
}
