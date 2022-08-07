using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using LoanApplicationProject.DTO;
using LoanApplicationProject.Models;
using LoanApplicationProject.Response;
using Microsoft.EntityFrameworkCore;
using System.Web;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace LoanApplicationProject.Services
{
    public class LoanService : ILoanService
    {
        private readonly DataContext _context;
        // private readonly IHttpContextAccessor _httpContextAccessor;
        public LoanService(DataContext context){
            _context = context;
            // _httpContextAccessor = httpContextAccessor;
        }
        // private string GetUsername() => _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).ToString();
        public async Task<ServiceResponse<List<Loan>>> AddLoan(AddLoanDto loanDto)
        {
            var response = new ServiceResponse<List<Loan>>();
            try {
                var user = await _context.Users.FirstOrDefaultAsync
                        (u => u.FirstName.ToLower() == loanDto.UserFName.ToLower()
                        && u.LastName.ToLower() == loanDto.UserLName.ToLower());
                if(user == null){
                    response.Success = false;
                    response.Message ="User not found";
                    return response;
                }
                var loan = new Loan(){
                    LoanNumber = _context.Loans.Max(loan => loan.LoanNumber)+ 1,
                    Amount = loanDto.Amount,
                    Term = loanDto.Term,
                    Type= loanDto.Type,
                    PropertyInfo = loanDto.PropertyInfo,
                    // Status = loanDto.Status,
                    Date = loanDto.CreationDate,
                    UserId = user.Id
            };
            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();
            response.Data = await _context.Loans.
                            Where(l => l.UserId == user.Id).
                            ToListAsync();
        }catch(Exception ex){
            response.Success = false;
            response.Message = ex.Message;
        }
        return response;
            
        }

        public async Task<ServiceResponse<List<Loan>>> DeleteLoan(int loanId)
        {
            var response  = new ServiceResponse<List<Loan>>();
            try 
            {
                var loan = await _context.Loans.FirstOrDefaultAsync(l => l.LoanNumber == loanId);
                if(loan != null){
                    _context.Loans.Remove(loan);
                    await _context.SaveChangesAsync();
                    response.Data = await _context.Loans.ToListAsync();
                }else 
                {
                    response.Success = false;
                    response.Message = "Loan not found";
                }
                
            } catch(Exception ex){
                    response.Success = false;
                    response.Message = ex.Message;
            }
            return response;
        }

        public async Task<List<User>> GetLoans()
        {
           return await _context.Users.Include(l=> l.Loans).ToListAsync();
        }

        public async Task<ServiceResponse<Loan>> UpdateLoan(UpdateLoanDto loanDto, int id)
        {
            var response = new ServiceResponse<Loan>();
            try 
            {
                var loan =await _context.Loans.FirstOrDefaultAsync(l=> l.LoanNumber == id);
                if(loan != null)
                {
                    loan.Amount = loanDto.Amount;
                    loan.Type = loanDto.Type;
                    loan.Term = loanDto.Term;
                    await _context.SaveChangesAsync();
                    response.Data = loan;
                } else 
                {
                    response.Success = false;
                    response.Message = "Loan not found";
                }
                
            } catch(Exception ex){
                response.Success = false;
                response.Message = ex.Message;
            }
            return response;
        }
         
        public async Task<ServiceResponse<dynamic>> SearchLoan(PagingParamtersModel pagingparamtersmodel, string role, string username)
        {
            ServiceResponse<dynamic> response = new ServiceResponse<dynamic>();
            int currentpage = 0,pageSize =0;
            // var user=null;
            var user = await _context.Users.Join(_context.Loans, 
                            u => u.Id, l => l.UserId,
                            (user, loan) => new {
                                user.FirstName,
                                user.LastName,
                                user.Username,
                                loan.LoanNumber,
                                loan.Amount,
                                loan.Term,
                                loan.Type,
                                loan.PropertyInfo,
                                loan.Date
                            }).ToListAsync();
            try 
            {
                // user = await _context.Users.Include(u => u.Loans).
                //             Where(u=> u.Role != "ADMIN").ToListAsync();
                // When pageno or page size, Return complete data
                if(pagingparamtersmodel.pageNumber <= 0 || pagingparamtersmodel.pageSize <= 0){
                    response.Data = role =="USER" ? user.Where(u=> u.Username == username) : user;
                    return response;
                }
                   

                currentpage = pagingparamtersmodel.pageNumber;
                pageSize = pagingparamtersmodel.pageSize;

                if(pagingparamtersmodel.LoanNumber > 0){
                    // user = user.Select(s=> new User{
                    //     FirstName = s.FirstName,
                    //     LastName= s.LastName,
                    //     Username = s.Username,
                    //     Loans= s.Loans.Where(l=> l.LoanNumber==pagingparamtersmodel.LoanNumber).ToList()
                    // }).Where(u=> u.Loans.Count() > 0).ToList();
                    user = user.Where(u=> u.LoanNumber == pagingparamtersmodel.LoanNumber).ToList();
                }
                
                if(!string.IsNullOrWhiteSpace(pagingparamtersmodel.firstName)){
                    user = user.Where(u=> (u.FirstName.ToLower().
                            Contains(pagingparamtersmodel.firstName.ToLower()))).ToList();
                }

                if(!string.IsNullOrWhiteSpace(pagingparamtersmodel.lastName))
                    user = user.Where(u=> (u.LastName.ToLower().
                        Contains(pagingparamtersmodel.lastName.ToLower()))).ToList();
                if(role =="USER"){
                    user = user.Where(u=>u.Username == username).ToList();
                }
                user = user.Skip((currentpage-1) * pageSize).Take(pageSize).ToList();
                response.Data = new {
                        pageSize = pageSize,
                        currentpage = currentpage,
                        userLoans = user
                    };   
            }catch(Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }
            return response;    
        } 
    }
}