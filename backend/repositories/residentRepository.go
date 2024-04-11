package repositories

import (
	"fmt"

	"github.com/JoaoVFerreira/condominium_dapp/initializers"
	"github.com/JoaoVFerreira/condominium_dapp/models"
	"gorm.io/gorm"
)

var ErrResidentNotFound = fmt.Errorf("resident not found")

type Resident struct {
	Wallet  string
	Name    string
	Profile int
	Phone   *string
	Email   *string
}

type ResidentRepository interface {
	GetResident(wallet string) (*models.ResidentModel, error)
	AddResident(Resident) (models.ResidentModel, error)
	UpdateResident(Resident) (models.ResidentModel, error)
	DeleteResident(wallet string) (err error)
}

type ResidentRepositoryImplementation struct {
	Db *gorm.DB
}

func NewResidentRepositoryImplementation(Db *gorm.DB) ResidentRepository {
	return &ResidentRepositoryImplementation{Db: initializers.DB}
}

func (r *ResidentRepositoryImplementation) AddResident(resident Resident) (models.ResidentModel, error) {
	var phone, email *string

	if resident.Phone!= nil {
		phone = resident.Phone
	}

	if resident.Email!= nil {
		email = resident.Email
	}

	newResident := models.ResidentModel{
		Wallet:  resident.Wallet,
		Name:    resident.Name,
		Profile: resident.Profile,
		Phone:   phone,
		Email:   email,
	}

	result := r.Db.Create(&newResident)

	if result.Error!= nil {
		return models.ResidentModel{}, fmt.Errorf("failed to add resident: %w", result.Error)
	}

	return newResident, nil
}

func (r *ResidentRepositoryImplementation) DeleteResident(wallet string) (err error) {
	resident := models.ResidentModel{}

	result := r.Db.Where("wallet = ?", wallet).First(&resident)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return fmt.Errorf("resident not found with the given wallet: %s", wallet)
		}
		return fmt.Errorf("failed to find resident with wallet %s: %w", wallet, result.Error)
	}

	result = r.Db.Delete(&resident)

	if result.Error != nil {
		return fmt.Errorf("failed to delete resident with wallet %s: %w", wallet, result.Error)
	}

	return nil
}

func (r *ResidentRepositoryImplementation) GetResident(wallet string) (*models.ResidentModel, error) {
	resident := &models.ResidentModel{}
	result := r.Db.Where("wallet =?", wallet).First(resident)

	if result.Error!= nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, ErrResidentNotFound
		}
		return nil, fmt.Errorf("failed to find resident with wallet %s: %w", wallet, result.Error)
	}

	return resident, nil
}

func (r *ResidentRepositoryImplementation) UpdateResident(resident Resident) (models.ResidentModel, error) {
	residentModel := models.ResidentModel{}
	result := r.Db.Where("wallet =?", resident.Wallet).First(&residentModel)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return models.ResidentModel{}, fmt.Errorf("resident not found with the given wallet: %s", resident.Wallet)
		}
		return models.ResidentModel{}, fmt.Errorf("failed to find resident with wallet %s: %w", resident.Wallet, result.Error)
	}

	residentModel.Name = resident.Name
	residentModel.Profile = resident.Profile

	if resident.Phone != nil {
		residentModel.Phone = resident.Phone
	}

	if resident.Email != nil {
		residentModel.Email = resident.Email
	}

	result = r.Db.Save(&residentModel)

	if result.Error != nil {
		return models.ResidentModel{}, fmt.Errorf("failed to update resident with wallet %s: %w", resident.Wallet, result.Error)
	}

	return residentModel, nil
}
