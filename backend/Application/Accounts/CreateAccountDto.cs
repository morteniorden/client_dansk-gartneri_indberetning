using System;
using System.Collections.Generic;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Accounts
{
  public class CreateAccountDto
  {
    public string Email { get; set; }
    public string Name { get; set; }
    public string Tel { get; set; }
    public AddressDto Address { get; set; }
    public string CVRNumber { get; set; }
  }
}
