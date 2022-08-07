using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoanApplicationProject.Models
{
    public class PagingParamtersModel
    {
        // const int maxPageSize = 5;
        public int pageNumber {get;set;}
        private int _pageSize {get;set;}
        // public int pageSize{
        //     get { return _pageSize;}
        //     set { _pageSize = value > maxPageSize ? maxPageSize:value;}
        // }
        public int pageSize{
            get { return _pageSize;}
            set { _pageSize = value > 0 ? value:5;}
        }
        public string firstName{get;set;}
        public string lastName{get;set;}
        public int LoanNumber {get;set;}
    }
}