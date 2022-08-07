using API.Models;
using API.DTO;
using System.Threading.Tasks;
using LoanApplicationProject.Response;
using LoanApplicationProject.DTO;

namespace API.Services
{
    public interface IUserService
    {
         public Task<ServiceResponse<UserResponseDto>> Login(UserDto userDto);
    }
}