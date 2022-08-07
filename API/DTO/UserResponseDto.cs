using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoanApplicationProject.DTO
{
    public class UserResponseDto
    {
        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string Username {get;set;}
        public string Token {get;set;}
        public string Role {get;set;}
    }
}