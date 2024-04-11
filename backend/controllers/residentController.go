package controllers

import (
	"net/http"

	"github.com/JoaoVFerreira/condominium_dapp/data/request"
	"github.com/JoaoVFerreira/condominium_dapp/data/response"
	"github.com/JoaoVFerreira/condominium_dapp/helper"
	"github.com/JoaoVFerreira/condominium_dapp/services"
	"github.com/gin-gonic/gin"
)

type ResidentController struct {
	residentService services.ResidentService
}

func NewResidentController(service services.ResidentService) *ResidentController {
	return &ResidentController{
		residentService: service,
	}
}

func (controller *ResidentController) Create(ctx *gin.Context) {
	var err error
	residentData := request.CreateResidentRequest{}
	err = ctx.ShouldBindJSON(&residentData)
	if err != nil {
		helper.ErrorResponse(ctx, http.StatusBadRequest, "Invalid request data")
		return
	}

	newResident, err := controller.residentService.Create(residentData)
	if err != nil {
		helper.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to create resident")
		return
	}

	webResponse := response.Response{
		Message: "Resident added to the condominium with success!",
		Response:    newResident,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ResidentController) GetOne(ctx *gin.Context) {
	wallet := ctx.Param("wallet")

	if wallet == "" {
		helper.ErrorResponse(ctx, http.StatusBadRequest, "Invalid wallet parameter")
		return
	}

	resident, err := controller.residentService.GetOne(request.GetOneResidentRequest{Wallet: wallet})
	if err != nil {
		helper.ErrorResponse(ctx, http.StatusNotFound, "Resident not found")
		return
	}

	webResponse := response.Response{
		Message: "Resident found with success!",
		Response:    resident,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ResidentController) DeleteOne(ctx *gin.Context) {
	wallet := ctx.Param("wallet")

	if wallet == "" {
		helper.ErrorResponse(ctx, http.StatusBadRequest, "Invalid wallet parameter")
		return
	}

	if err := controller.residentService.Delete(request.GetOneResidentRequest{Wallet: wallet}); err != nil {
		helper.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to delete resident")
		return
	}

	webResponse := response.Response{
		Message: "Resident removed from the condominium!",
		Response:    nil,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *ResidentController) UpdateOne(ctx *gin.Context) {
	var residentRequest request.UpdateResidentRequest
	
	if err := ctx.ShouldBindJSON(&residentRequest); err != nil {
		helper.ErrorResponse(ctx, http.StatusBadRequest, "Invalid request body")
		return
	}

	wallet := ctx.Param("wallet")
	if wallet == "" {
		helper.ErrorResponse(ctx, http.StatusBadRequest, "Wallet must be provided")
		return
	}

	updatedResident, err := controller.residentService.Update(residentRequest, wallet)
	if err != nil {
		helper.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to update resident")
		return
	}

	webResponse := response.Response{
		Message: "Resident updated with success!",
		Response:    updatedResident,
	}

	ctx.JSON(http.StatusOK, webResponse)
}