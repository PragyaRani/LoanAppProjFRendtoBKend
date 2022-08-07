using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using LoanApplicationProject.DTO;
using LoanApplicationProject.Models;
using LoanApplicationProject.Response;

namespace LoanApplicationProject.Services
{
    public interface ILoanService
    {
        Task<List<User>> GetLoans();
        Task<ServiceResponse<List<Loan>>> AddLoan(AddLoanDto loanDto);
        Task<ServiceResponse<Loan>> UpdateLoan(UpdateLoanDto loanDto, int id);
        Task<ServiceResponse<List<Loan>>> DeleteLoan(int loanId);
        Task<ServiceResponse<object>> SearchLoan(PagingParamtersModel pagingparamtersmodel,string role, string username);
    }
}