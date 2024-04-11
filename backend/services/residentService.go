package services

import (
	"errors"
	"fmt"
	"strings"

	"github.com/JoaoVFerreira/condominium_dapp/data/request"
	"github.com/JoaoVFerreira/condominium_dapp/models"
	"github.com/JoaoVFerreira/condominium_dapp/repositories"
	"github.com/go-playground/validator"
)

type ResidentService interface {
	Create(resident request.CreateResidentRequest) (models.ResidentModel, error)
	GetOne(residentWallet request.GetOneResidentRequest) (*models.ResidentModel, error)
	Delete(residentWallet request.GetOneResidentRequest) error
	Update(resident request.UpdateResidentRequest, wallet string) (models.ResidentModel, error)
}

type ResidentServiceImplementation struct {
	ResidentRepository repositories.ResidentRepository
	Validate           *validator.Validate
}

func NewResidentServiceImplementation(residentRepository repositories.ResidentRepository, validate *validator.Validate) ResidentService {
	return &ResidentServiceImplementation{
		ResidentRepository: residentRepository,
		Validate:           validate,
	}
}

func (r *ResidentServiceImplementation) GetOne(residentWallet request.GetOneResidentRequest) (*models.ResidentModel, error) {
	err := r.Validate.Var(residentWallet.Wallet, "required")

	if err != nil {
		return nil, fmt.Errorf("invalid wallet parameter: %w", err)
	}

	resident, err := r.ResidentRepository.GetResident(strings.ToLower(residentWallet.Wallet))
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve resident: %w", err)
	}

	return resident, nil
}

func (r *ResidentServiceImplementation) Create(resident request.CreateResidentRequest) (models.ResidentModel, error) {
	err := r.Validate.Struct(resident)
	if err != nil {
		return models.ResidentModel{}, fmt.Errorf("invalid request body: %w", err)
	}

	existingResident, err := r.ResidentRepository.GetResident(strings.ToLower(resident.Wallet))
	if err != nil {
		if !errors.Is(err, repositories.ErrResidentNotFound) {
			return models.ResidentModel{}, fmt.Errorf("failed to retrieve resident: %w", err)
		}
	} else if existingResident != nil {
		return models.ResidentModel{}, fmt.Errorf("resident with wallet %s already exists", resident.Wallet)
	}

	newResident := repositories.Resident{
		Wallet:  strings.ToLower(resident.Wallet),
		Name:    resident.Name,
		Profile: resident.Profile,
		Phone:   resident.Phone,
		Email:   resident.Email,
	}

	createdResident, err := r.ResidentRepository.AddResident(newResident)
	if err != nil {
		return models.ResidentModel{}, fmt.Errorf("failed to create resident: %w", err)
	}

	return createdResident, nil
}

func (r *ResidentServiceImplementation) Delete(residentWallet request.GetOneResidentRequest) error {
	err := r.Validate.Var(residentWallet.Wallet, "required")
	if err != nil {
		return fmt.Errorf("invalid wallet parameter: %w", err)
	}

	if err := r.ResidentRepository.DeleteResident(strings.ToLower(residentWallet.Wallet)); err != nil {
		return fmt.Errorf("failed to delete resident: %w", err)
	}

	return nil
}

func (r *ResidentServiceImplementation) Update(resident request.UpdateResidentRequest, wallet string) (models.ResidentModel, error) {
	if err := r.Validate.Struct(resident); err != nil {
		return models.ResidentModel{}, fmt.Errorf("invalid request body: %w", err)
	}

	var name string
	if resident.Name != nil {
		name = *resident.Name
	}

	var profile int
	if resident.Profile != nil {
		profile = *resident.Profile
	}

	res := repositories.Resident{
		Wallet:  strings.ToLower(wallet),
		Name:    name,
		Profile: profile,
		Phone:   resident.Phone,
		Email:   resident.Email,
	}

	updatedResident, err := r.ResidentRepository.UpdateResident(res)
	if err != nil {
		return models.ResidentModel{}, fmt.Errorf("failed to update resident: %w", err)
	}

	return updatedResident, nil
}