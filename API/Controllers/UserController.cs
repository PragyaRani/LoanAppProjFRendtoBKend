using System;
using System.Threading.Tasks;
using API.DTO;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    // [Route("[controller]")]
     [Route("")]
    public class UserController :ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService){
            _userService = userService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto userDto){
            try 
            {
                var response = await _userService.Login(userDto);
                if(response.Success)
                    return Ok(response);
                return BadRequest(response);
            }
            catch(Exception ex){
                return NotFound(ex.Message);
            }
        }
    }
}