using System;
using System.Collections.Generic;
using NUnit.Framework;
using Moq;
using API.DTO;
using API.Services;
using API.Controllers;
using LoanApplicationProject.Services;
using LoanApplicationProject.Controllers;
using LoanApplicationProject.Models;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using LoanApplicationProject.DTO;
using System.Threading.Tasks;

namespace NunitApi
{
    [TestFixture]
    public class AdminControllerTest
    {
        [Test]
        public async Task Admin_Get_Loan(){
            
            var loanService = new Mock<ILoanService>();
            loanService.Setup(repo => repo.GetLoans()).ReturnsAsync(GetUserData());
            var controller = new AdminController(loanService.Object);
            // var mock = new Mock<ControllerContext>();
            // mock.SetupGet(x => x.HttpContext.User.Identity.Name).Returns("SOMEUSER");
            // mock.SetupGet(x => x.HttpContext.Request.Scheme).Returns("Bearer");
            // controller.ControllerContext = mock.Object;
            var result = await controller.GetLoans();
            loanService.Verify(u => u.GetLoans());
            // var viewResult = Assert.IsType<OkObjectResult>(result);
            // Assert.AreEqual(OkResult(GetUserData()), GetUserData());
            loanService.Verify();
        }

        [Test]
        public void Admin_Add_Loan(){
            var addloanDto = new AddLoanDto(){
                UserFName ="Pragya",
                UserLName = "Das",
                PropertyInfo = "UK",
                Amount = 12000,
                Term = 14
            };
            var loanService = new Mock<ILoanService>();
            loanService.Setup(repo => repo.AddLoan(addloanDto));
            var controller = new AdminController(loanService.Object);
            controller.AddLoan(addloanDto);
            loanService.Verify(u => u.AddLoan(addloanDto));
        }
        [Test]
        public void Admin_Update_Loan(){
            var updateloanDto = new UpdateLoanDto(){
                Amount = 12000,
                Term = 14
            };
            var loanService = new Mock<ILoanService>();
            loanService.Setup(repo => repo.UpdateLoan(updateloanDto,101));
            var controller = new AdminController(loanService.Object);
            controller.ModifyLoan(updateloanDto,101);
            loanService.Verify();
        }
        [Test]
        public void Admin_Search_Loan(){
            PagingParamtersModel model = new PagingParamtersModel{
                pageNumber = 1,
                pageSize=5,
                firstName = "pragya"
            };
            var loanService = new Mock<ILoanService>();
            loanService.Setup(repo => repo.SearchLoan(model,"Admin", "pragyar"));
            var controller = new AdminController(loanService.Object);
            controller.GetLoanDetails(model);
            // loanService.Verify(u => u.SearchLoan(model,"Admin", "pragyar"));
        }
        private List<User> GetUserData()
        {
            var users = new List<User>();
            users.Add(new User()
            {
                FirstName = "Pragya",
                Id = 1,
                Loans = new List<Loan>(){new Loan{Amount =1000, LoanNumber=101}}
            });
            users.Add(new User()
            {
                FirstName = "Ganesh",
                Id = 1,
                Loans = new List<Loan>(){new Loan{Amount =1000, LoanNumber=102}}
            });
            return users;
        }
    }
}