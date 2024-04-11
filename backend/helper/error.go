package helper

import (
	"github.com/JoaoVFerreira/condominium_dapp/data/response"
	"github.com/gin-gonic/gin"
)

func ErrorPanic(err error) {
	if err != nil {
		panic(err)
	}
}

func ErrorResponse(ctx *gin.Context, statusCode int, message string) {
	webResponse := response.Response{
		Message: message,
		Response:   nil,
	}

	ctx.JSON(statusCode, webResponse)
}