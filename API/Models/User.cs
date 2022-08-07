
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class User
    {
        public int Id {get;set;}
        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string Username {get;set;}
        [JsonIgnore]
        public string Password {get;set;}
        public string Role {get;set;}
        public List<Loan> Loans {get;set;}
    }
}