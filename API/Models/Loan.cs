using System;
namespace API.Models
{
    public class Loan
    {

        public int LoanNumber {get;set;}
        public int Amount {get;set;}
        public int Term {get;set;}
        public string Type {get;set;}
        public string BorrowerInfo{get;set;}="Mortgage";
        public string PropertyInfo{get;set;}
        public string Status {get;set;}="Pending";
        public string Fees {get;set;}="10000";
        public DateTime Date{get;set;} =DateTime.Today;
        public string OriginationAccount{get;set;}
        public int UserId{get;set;}
      

    }
}