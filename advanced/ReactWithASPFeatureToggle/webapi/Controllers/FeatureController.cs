using Microsoft.AspNetCore.Mvc;
using Microsoft.FeatureManagement;
using webapi;
using webapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeatureController : ControllerBase
{
    private readonly IFeatureManager _featureManager;
    private readonly ILogger<FeatureController> _logger;


    public FeatureController(ILogger<FeatureController> logger, IFeatureManager featureManager)
    {
        _featureManager = featureManager;
        _logger = logger;

    }

    [HttpGet(Name = "GetShowNews")]
    public async Task<IActionResult> Get()
    {
        string status = "disabled";

        if (await _featureManager.IsEnabledAsync(MyFeatureFlags.ShowNews))
        {
            status = "enabled";
        }

        return Ok(status);

    }


}


