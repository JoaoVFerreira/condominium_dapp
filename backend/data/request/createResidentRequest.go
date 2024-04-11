package request

type CreateResidentRequest struct {
	Wallet  string  `json:"wallet"`
	Name    string  `validate:"required,min=1,max=200" json:"name"`
	Profile int     `json:"profile"`
	Phone   *string `json:"phone"`
	Email   *string `json:"email"`
}