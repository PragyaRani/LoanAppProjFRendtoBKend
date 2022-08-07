using System.Linq;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Data
{
    public class DataContext:DbContext
    {
        public DbSet<User> Users {get;set;}
        public DbSet<Loan> Loans {get;set;}
        public DataContext(DbContextOptions<DataContext> options) : base(options){
        
        }
         protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);
            builder.Entity<User>().ToTable("Users");
            builder.Entity<User>().HasKey(u => u.Id);
            builder.Entity<User>().Property(u => u.Id).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<User>().Property( u => u.Username).IsRequired().HasMaxLength(30);
            builder.Entity<User>().Property( u => u.Password).IsRequired().HasMaxLength(30);
            // builder.Entity<User>().HasMany(u=> u.Loans).
            //     WithOne(u=> u.Users).HasForeignKey(u => u.UserId);
            // builder.Entity<User>().HasData(
            //     new User { Id = 1, Username ="Pragya", Password ="Pragya@123", Role="User"},
            //     new User { Id = 2, Username ="PragyaRani", Password ="Pragya@123", Role ="Admin"}
            // );
            builder.Entity<Loan>().ToTable("Loans");
            builder.Entity<Loan>().HasKey(u => u.LoanNumber);
            builder.Entity<Loan>().Property(u => u.LoanNumber).IsRequired().ValueGeneratedOnAdd();
            builder.Entity<Loan>().Property( u => u.Amount).IsRequired().HasMaxLength(30);
            builder.Entity<Loan>().Property( u => u.Term).IsRequired().HasMaxLength(30);
            // builder.Entity<Loan>().Property( u=> u.UserId).hasf

        }

        // private void LoadUserInfo(){
        //     User user = new User(){
        //         Id = 1, Username ="Pragya", Password ="Pragya@123", Role="User"
        //     };
        //     Users.Add(user);
        //     user = new User(){
        //         Id = 2, Username ="PragyaRani", Password ="Pragya@123", Role ="Admin"
        //     };
        //     Users.Add(user);
        // }
        public List<User> GetUser(){
            return Users.Local.ToList<User>();
        }
    }
}