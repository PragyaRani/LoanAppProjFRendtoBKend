using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoanApplicationProject.DTO
{
    public class UpdateLoanDto
    {
        public int Amount {get;set;}
        public string Type {get;set;}
        public int Term {get;set;}
    }
}