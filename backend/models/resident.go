package models

import (
	"time"

	"gorm.io/gorm"
)

type ResidentModel struct {
	ID           	uint64 					`json:"id"`
	CreatedAt    	time.Time 			`json:"created_at"`
	UpdatedAt    	time.Time 			`json:"updated_at"`
	DeletedAt    	gorm.DeletedAt  `json:"deleted_at,omitempty"`
	Wallet 				string  				`json:"wallet"`
	Name 					string  				`json:"name"`
	Profile 			int     				`json:"profile"`
	Phone 				*string 				`json:"phone"`
	Email 				*string 				`json:"email"`
}

func (ResidentModel) TableName() string {
	return "resident"
}
