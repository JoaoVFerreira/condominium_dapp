package main

import (
	"net/http"
	"os"

	"github.com/JoaoVFerreira/condominium_dapp/controllers"
	"github.com/JoaoVFerreira/condominium_dapp/initializers"
	"github.com/JoaoVFerreira/condominium_dapp/repositories"
	"github.com/JoaoVFerreira/condominium_dapp/services"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
)

const wallet = "/:wallet"

func init() {
	initializers.LoadEnvVariables();
	initializers.ConnectToDB();
}

func main() {
	r := gin.Default()

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	validate := validator.New()
	residentRepository := repositories.NewResidentRepositoryImplementation(initializers.DB)
	residentService := services.NewResidentServiceImplementation(residentRepository, validate)
	residentController := controllers.NewResidentController(residentService)

	residentRouter := r.Group("/residents")
	residentRouter.POST("", residentController.Create)
	residentRouter.GET(wallet, residentController.GetOne)
	residentRouter.DELETE(wallet, residentController.DeleteOne)
	residentRouter.PUT(wallet, residentController.UpdateOne)

	port := os.Getenv("PORT")
	r.Run(port) 
}