using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LoanApplicationProject.DTO;
using LoanApplicationProject.Models;
using LoanApplicationProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LoanApplicationProject.Controllers
{
    [Authorize(Roles ="ADMIN")]
    [ApiController]
    [Route("")]
    
    public class AdminController:ControllerBase
    {
        private readonly ILoanService _loanService;
        public AdminController(ILoanService loanService){
            _loanService = loanService;
        }
        [AllowAnonymous]
        [HttpGet("searchloans")]
        public async Task<IActionResult> GetLoanDetails([FromQuery]PagingParamtersModel pagingparametersmodel){
           try 
           {
                var role = (User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value);
                var username = (User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value);
                return Ok(await _loanService.SearchLoan(pagingparametersmodel, role, username));
           }catch(Exception ex){
                return BadRequest(ex.Message);
           }
        }

        [HttpGet("loans")]
        public async Task<IActionResult> GetLoans(){
           try 
           {
                return Ok(await _loanService.GetLoans());
           }catch(Exception ex)
           {
                return BadRequest(ex.Message);
           }
        }
        [HttpPost("loans")]
        public async Task<IActionResult> AddLoan(AddLoanDto loanDto){
            try 
            {
                var response = await _loanService.AddLoan(loanDto);
                if(response == null)
                    return BadRequest(response);
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPatch("loan/{id}")]
        public async Task<IActionResult> ModifyLoan(UpdateLoanDto loan, int id){
            try
            {
                var response = await _loanService.UpdateLoan(loan,id);
                if(response == null)
                        return BadRequest(response);
                    return Ok(response);
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("loan/{id}")]
        public async Task<IActionResult> DeleteLoan(int loanId){
            try
            {
                var response = await _loanService.DeleteLoan(loanId);
                if(response == null)
                    return BadRequest(response);
                return Ok(response);
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
    }
}