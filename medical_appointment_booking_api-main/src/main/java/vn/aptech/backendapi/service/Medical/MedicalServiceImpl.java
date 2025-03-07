package vn.aptech.backendapi.service.Medical;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aptech.backendapi.dto.MedicalDto;
import vn.aptech.backendapi.entities.Medical;
import vn.aptech.backendapi.entities.Partient;
import vn.aptech.backendapi.exception.ResourceNotFoundException;
import vn.aptech.backendapi.repository.MedicalRepository;
import vn.aptech.backendapi.repository.PartientRepository;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class MedicalServiceImpl implements MedicalService {
    @Autowired
    private MedicalRepository medicalRepository;
    
    @Autowired
    private PartientRepository patientRepository;
    
    @Autowired
    private ModelMapper mapper;

    private Medical convertToEntity(MedicalDto medicalDto) {
        Medical medical = new Medical();
        medical.setId(medicalDto.getId());
        medical.setName(medicalDto.getName());
        medical.setContent(medicalDto.getContent());
        medical.setPrescription(medicalDto.getPrescription());
        medical.setDayCreate(LocalDate.parse(medicalDto.getDayCreate()));
        return medical;
    }

    private MedicalDto convertToDto(Medical medical) {
        MedicalDto medicalDto = new MedicalDto();
        medicalDto.setId(medical.getId());
        medicalDto.setName(medical.getName());
        medicalDto.setContent(medical.getContent());
        medicalDto.setPrescription(medical.getPrescription());
        if (medical.getPartient() != null) {
            medicalDto.setPatientId(medical.getPartient().getId());
        }
        medicalDto.setDayCreate(String.valueOf(medical.getDayCreate()));
        return medicalDto;
    }

    @Override
    public MedicalDto createMedical(MedicalDto medicalDto) {
        Medical medical = convertToEntity(medicalDto);
        
        Partient partient = patientRepository.findById(medicalDto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + medicalDto.getPatientId()));

        medical.setPartient(partient);
        Medical savedMedical = medicalRepository.save(medical);
        return convertToDto(savedMedical);
    }

    @Override
    public MedicalDto updateMedical(Long id, MedicalDto medicalDto) {
        Medical medical = medicalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found with ID: " + id));

        medical.setName(medicalDto.getName());
        medical.setContent(medicalDto.getContent());
        medical.setPrescription(medicalDto.getPrescription());
        medical.setDayCreate(LocalDate.parse(medicalDto.getDayCreate()));

        if (medicalDto.getPatientId() != null) {
            Partient partient = patientRepository.findById(medicalDto.getPatientId())
                    .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + medicalDto.getPatientId()));
            medical.setPartient(partient);
        }

        Medical updatedMedical = medicalRepository.save(medical);
        return convertToDto(updatedMedical);
    }

    @Override
    public void deleteMedical(Long id) {
        Medical medical = medicalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found with ID: " + id));
        medicalRepository.delete(medical);
    }
}
