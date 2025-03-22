using Microsoft.Extensions.Logging;
using Showcase.Controllers;
using Moq;
using Microsoft.AspNetCore.Mvc;

namespace ShowcaseTests
{
    public class ControllerTest
    {
        [Fact]
        public void Index_ReturnsViewResult()
        {
            //Arrange
            Mock<ILogger<HomeController>> mockLogger = new Mock<ILogger<HomeController>>();
            var controller = new HomeController(mockLogger.Object);

            //Act
            var result = controller.Index();

            //Assert
            Assert.IsType<ViewResult>(result);
        }
    }
}