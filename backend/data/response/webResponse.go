package response

type Response struct {
	Message  string      `json:"message"`
	Response interface{} `json:"response,omitempty"`
}