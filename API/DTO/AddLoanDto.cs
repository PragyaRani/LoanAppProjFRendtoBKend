using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LoanApplicationProject.DTO
{
    public class AddLoanDto
    {
        [Required]
        public string UserFName{get;set;}

        [Required]
        public string UserLName{get;set;}

        [Required]
        public int LoanNumber{get;set;}
        [Required]
        public string PropertyInfo{get;set;}
        public int Amount {get;set;}
        public int Term {get;set;}
        public string Type {get;set;}
        // public string Status {get;set;}
        public DateTime CreationDate{get;set;}
    }
}