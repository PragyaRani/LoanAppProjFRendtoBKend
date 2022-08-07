using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Services;
using LoanApplicationProject.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ILoanService, LoanService>();
           
            // services.AddDbContext<DataContext>(opt => {
            //      opt.UseInMemoryDatabase("loan-api-memory");
            // }); 
            services.AddDbContext<DataContext>(options =>
            {
                options.UseInMemoryDatabase("API");
            }); 
            services.AddScoped<DataContext>();
             
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
            AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters{
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    System.Text.Encoding.UTF8.GetBytes(
                        Configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme{
                    Description = "Standard Authorization header using the Bearer scheme, e.g \"bearer {token}\"",
                    In= ParameterLocation.Header,
                    Name ="Authorization",
                    Type=SecuritySchemeType.ApiKey
                });
                c.OperationFilter<SecurityRequirementsOperationFilter>();
            });
            //  services.AddScoped<IHttpContextAccessor, HttpContextAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(x => x.SetIsOriginAllowed(origin => true).AllowAnyMethod().AllowAnyHeader()
            .AllowCredentials());
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetService<DataContext>();
            AddSeedData(context);
        }

        private static void AddSeedData(DataContext context){
            User user = new User(){
                Id = 1, FirstName="Pragya" , LastName ="Das", Username ="pragyad", 
                Password ="Pragya@123", Role="USER"
            };
            context.Users.Add(user);
            
            user = new User() { 
                Id = 2,FirstName="Pragya" , LastName ="Rani", Username ="pragyar", 
                Password ="Pragya@123", Role ="ADMIN"
            };
            context.Users.Add(user);

            user = new User(){
                Id = 3,FirstName="Peter" , LastName ="Poll", Username ="peterp", 
                Password ="Peter@123", Role="USER"
            };
            context.Users.Add(user);
            user = new User(){
                Id = 5,FirstName="John" , LastName ="Poll", Username ="johnp", 
                Password ="John@123", Role="USER"
            };
            context.Users.Add(user);
            user = new User() { 
                Id = 4,FirstName="Pragya" , LastName ="Bhagat", Username ="pragyar", 
                Password ="Pragya@123", Role ="USER"
            };
            context.Users.Add(user);
            Loan loan = new Loan(){
                LoanNumber =101100, Amount =10000,Term = 5,BorrowerInfo = "Morgage", Type ="HOUSE LOAN",
                PropertyInfo ="Bangalore", Status="Pending", Date =DateTime.Today,UserId = 1
            };
            context.Loans.Add(loan);
            loan = new Loan(){
                LoanNumber =101101, Amount =20000,Term = 5,BorrowerInfo = "Morgage", Type ="EDUCATION LOAN",
                PropertyInfo ="Pune", Status="Pending", Date =DateTime.Today,UserId = 1
            };
            context.Loans.Add(loan);
            loan = new Loan(){
                LoanNumber =101102, Amount =20000,Term = 5,BorrowerInfo = "Morgage", Type ="PERSONAL LOAN",
                PropertyInfo ="Pune", Status="Pending", Date =DateTime.Today,UserId = 1
            };
            context.Loans.Add(loan);
            loan = new Loan(){
                LoanNumber =101103, Amount =20000,Term = 5,BorrowerInfo = "Morgage", Type ="AUTOMOBILE LOAN",
                PropertyInfo ="Pune", Status="Pending", Date =DateTime.Today,UserId = 3
            };
            context.Loans.Add(loan);
            loan = new Loan(){
                LoanNumber =101104, Amount =20000,Term = 15,BorrowerInfo = "Morgage", Type ="BUSINESS Loan",
                PropertyInfo ="Pune", Status="Pending", Date =DateTime.Today,UserId = 4
            };
            context.Loans.Add(loan);
            
            context.SaveChanges();

        }
    }
}
