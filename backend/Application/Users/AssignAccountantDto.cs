using System.Collections.Generic;
using Application.Common.Mappings;
using Application.Statements;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.Users
{
  public class AssignAccountantDto
  {
    public int StatementId { get; set; }
    public string Email { get; set; }
    public AccountantType AccountantType { get; set; }
  }
}
