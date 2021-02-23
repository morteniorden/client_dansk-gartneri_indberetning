using Application.ExampleChildren;
using Application.ExampleChildren.Commands.CreateExampleChild;
using Application.ExampleChildren.Commands.DeleteExampleChild;
using Application.ExampleChildren.Commands.UpdateExampleChild;
using Application.ExampleChildren.Queries.GetExampleChildren;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{

  public class ExampleChildController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateChild([FromBody] CreateExampleChildCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateChild([FromRoute] int id, UpdateExampleChildCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteChild([FromRoute] int id)
    {
      await Mediator.Send(new DeleteExampleChildCommand
      {
        Id = id
      });
      return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<List<ExampleChildIdDto>>> GetAllChildren()
    {
      return await Mediator.Send(new GetExampleChildrenQuery());
    }

  }
}
