package main

import (
	"github.com/JoaoVFerreira/condominium_dapp/initializers"
	"github.com/JoaoVFerreira/condominium_dapp/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.ResidentModel{})
}
