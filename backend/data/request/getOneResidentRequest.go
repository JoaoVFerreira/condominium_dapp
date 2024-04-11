package request

type GetOneResidentRequest struct {
	Wallet string `validate:"required,max=200,min=1" json:"wallet"`
}