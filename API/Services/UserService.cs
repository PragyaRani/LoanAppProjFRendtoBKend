using System.Threading.Tasks;
using API.DTO;
using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;
using LoanApplicationProject.Response;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using LoanApplicationProject.DTO;

namespace API.Services
{
    public class UserService: IUserService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public UserService(DataContext context, IConfiguration configuration){
            _context = context;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<UserResponseDto>> Login(UserDto userDto)
        {
           var res = new ServiceResponse<UserResponseDto>();
           var user = await _context.Users.FirstOrDefaultAsync(
            x => x.Username == userDto.Username && x.Password == userDto.Password);
           if(user == null) {
              res.Success = false;
              res.Message ="Username or Password is wrong";
              return res;
           }
           UserResponseDto userRes = new UserResponseDto{
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = CreateToken(user),
                Username = user.Username,
                Role = user.Role
           };
           res.Data = userRes;
           return res;
        }

        private string CreateToken(User user){
            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };
            SymmetricSecurityKey key = new SymmetricSecurityKey
                (System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            SigningCredentials creds = new SigningCredentials
                (key,SecurityAlgorithms.HmacSha512Signature);
            SecurityTokenDescriptor desc = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(desc);
            return tokenHandler.WriteToken(token);

        }

    }
}