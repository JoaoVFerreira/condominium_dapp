package request

type UpdateResidentRequest struct {
	Name    *string `json:"name"`
	Profile *int    `json:"profile"`
	Phone   *string `json:"phone"`
	Email   *string `json:"email"`
}