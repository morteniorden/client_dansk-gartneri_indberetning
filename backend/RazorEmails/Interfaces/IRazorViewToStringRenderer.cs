using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;

namespace RazorEmails.Interfaces
{
  public interface IRazorViewToStringRenderer
  {
    Task<string> RenderViewToStringAsync<TModel>(string viewName, TModel model);
  }
}
