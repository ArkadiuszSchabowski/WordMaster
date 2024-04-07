using WordMaster.Database;
using WordMaster.Database.Entities;

namespace WordMaster.Seeders
{
    public interface IWordSeeder
    {
        void AddWords();
    }
    public class WordSeeder : IWordSeeder
    {
        private readonly MyDbContext _context;

        public WordSeeder(MyDbContext context)
        {
            _context = context;
        }
        public void AddWords()
        {
            if (!_context.Words.Any())
            {
                IList<Word> words = new List<Word>() {new Word
            {
                PolishWord = "KSIĄŻKA",
                EnglishWord = "BOOK"
            },
            new Word
            {
                PolishWord = "ŚWINKA MORSKA",
                EnglishWord = "GUINEA PIG"
            },
            new Word
            {
                PolishWord = "PROGRAMISTA",
                EnglishWord = "DEVELOPER"
            } };

                _context.AddRange(words);
                _context.SaveChanges();
            }
        }
    }
}
