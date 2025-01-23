package vn.aptech.backendapi.service.Medical;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aptech.backendapi.dto.MedicalDto;
import vn.aptech.backendapi.entities.Medical;
import vn.aptech.backendapi.entities.Partient;
import vn.aptech.backendapi.repository.MedicalRepository;
import vn.aptech.backendapi.repository.PartientRepository;

import java.time.LocalDate;

@Service
public class MedicalServiceImpl implements MedicalService{
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
        Partient partient = patientRepository.findById(medicalDto.getPatientId()).get();
        medical.setPartient(partient);

        Medical savedMedical = medicalRepository.save(medical);
        return convertToDto(savedMedical);
    }

//    @Override
//    public MedicalDto createMedical(MedicalDto medicalDto) {
//        Medical medical = mapper.map(medicalDto, Medical.class);
//        Medical savedMedical = medicalRepository.save(medical);
//        return mapper.map(savedMedical, MedicalDto.class);
//    }
}
