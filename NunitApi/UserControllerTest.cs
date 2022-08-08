using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NUnit.Framework;
using Moq;
using API.DTO;
using API.Services;
using API.Controllers;

namespace NunitApi
{
    [TestFixture]
    public class UserControllerTest
    {
        [Test]
        public void User_Login_With_CorrectIdAndPassword(){
            UserDto user = new UserDto{
                Username = "pragyad", 
                Password = "Pragya@123"
            };
            var userService = new Mock<IUserService>();
            var controller = new UserController(userService.Object);
            controller.Login(user);
            userService.Verify(u => u.Login(user));

        }
        [Test]
        public void User_Login_With_WrongIdAndPassword(){
            UserDto user = new UserDto{
                Username = "wewwe", 
                Password = "eew@123"
            };
            var userService = new Mock<IUserService>();
            var controller = new UserController(userService.Object);
            controller.Login(user);
            userService.Verify(u => u.Login(user));

        }
    }
}