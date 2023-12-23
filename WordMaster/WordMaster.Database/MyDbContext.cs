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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Word>().HasData(new Word
            {
                Id = 1,
                PolishWord = "KSIĄŻKA",
                EnglishWord = "BOOK"
            },
            new Word
            {
                Id=2,
                PolishWord = "ŚWINKA MORSKA",
                EnglishWord = "GUINEA PIG"
            },
            new Word
            {
                Id=3,
                PolishWord = "PROGRAMISTA",
                EnglishWord = "DEVELOPER"
            });
        }
    }
}
