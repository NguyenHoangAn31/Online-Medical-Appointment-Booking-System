package vn.aptech.backendapi.service.Patient;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.aptech.backendapi.dto.*;
import vn.aptech.backendapi.entities.Medical;
import vn.aptech.backendapi.entities.Partient;
import vn.aptech.backendapi.entities.User;
import vn.aptech.backendapi.repository.MedicalRepository;
import vn.aptech.backendapi.repository.PartientRepository;
import vn.aptech.backendapi.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {
    // writed by An in 5/6
    @Autowired
    private MedicalRepository medicalRepository;
    // end
    @Autowired
    private PartientRepository partientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    public PatientDto toDto(Partient p) {
        return mapper.map(p, PatientDto.class);
    }

    private PatientDto mapToPatientDto(Partient partient) {
        PatientDto patientDto = new PatientDto();
        patientDto.setId(partient.getId());
        patientDto.setFullName(partient.getFullName());
        patientDto.setGender(partient.getGender());
        patientDto.setBirthday(partient.getBirthday());
        patientDto.setAddress(partient.getAddress());
        patientDto.setImage(partient.getImage());
        patientDto.setCreatedAt(partient.getCreatedAt());
        return patientDto;
    }

    private MedicalDto mapToMedicalDto(Medical m) {
        MedicalDto medicalDto = new MedicalDto();
        medicalDto.setId(m.getId());
        medicalDto.setName(m.getName());
        medicalDto.setContent(m.getContent());
        medicalDto.setPrescription(m.getPrescription());
        medicalDto.setPatientId(m.getId());
        // create_at tự tạo
        return medicalDto;
    }

    public Optional<PatientDto> getPatientByUserId(int userId) {
        Partient patient = partientRepository.getPatientByUserId(userId);
        if (patient != null) {
            List<MedicalDto> medicalList = patient.getMedicals().stream()
                    .map(this::mapToMedicalDto)
                    .collect(Collectors.toList());
            PatientDto patientDto = mapToPatientDto(patient);
            patientDto.setMedicals(medicalList);
            return Optional.of(patientDto);
        } else {
            return Optional.empty();
        }
    }

    private PatientDto toPatientDto(Partient p) {
        PatientDto dto = mapper.map(p, PatientDto.class);
        dto.setMedicals(medicalRepository.findByPartientId(p.getId()).stream().map(this::toMedicalDto)
                .collect(Collectors.toList()));
        return dto;
    }

    @Override
    public Optional<PatientDto> getPatientByPatientId(int patientId) {
        Optional<Partient> result = partientRepository.findById(patientId);
        return result.map(this::toPatientDto);
    }

    // writed by An in 5/11
    @Override
    public List<PatientDto> getAll() {
        List<Partient> p = partientRepository.findAll();
        return p.stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PatientDto> findPatientsByScheduleDoctorIdAndStartTime(int scheduledoctorid, LocalTime starttime) {
        List<PatientDto> patientDtoList = partientRepository
                .findPatientsByScheduleDoctorIdAndStartTime(scheduledoctorid, starttime).stream().map(this::toDto)
                .collect(Collectors.toList());
        return patientDtoList;
    }

    @Override
    public List<PatientDto> findPatientsByDoctorIdAndFinishedStatus(int doctorId) {
        return partientRepository.findPatientsByDoctorIdAndFinishedStatus(doctorId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CustomPatientForEdit getPatientDetail(int userId) {
        Partient p = partientRepository.getPatientByUserId(userId);
        CustomPatientForEdit customPatient = new CustomPatientForEdit();
        customPatient.setFullName(p.getFullName());
        customPatient.setImage(p.getImage());
        customPatient.setGender(p.getGender());
        customPatient.setBirthday(p.getBirthday().toString());
        customPatient.setAddress(p.getAddress());
        customPatient.setPhone(p.getUser().getPhone());
        customPatient.setEmail(p.getUser().getEmail());
        customPatient.setMedicalDto(medicalRepository.findByPartientId(p.getId()).stream().map(this::toMedicalDto)
                .collect(Collectors.toList()));
        return customPatient;
    }

    @Override
    public CustomPatientEditDto getPatientDetail01(int userId) {
        System.out.println(userId);
        Partient p = partientRepository.findById(userId).get();
        CustomPatientEditDto customPatient = new CustomPatientEditDto();
        customPatient.setFullName(p.getFullName());
        customPatient.setGender(p.getGender());
        customPatient.setBirthday(p.getBirthday().toString());
        customPatient.setAddress(p.getAddress());
        customPatient.setPhone(p.getUser().getPhone());
        customPatient.setEmail(p.getUser().getEmail());
        return customPatient;
    }

    @Override
    public boolean editPatient(int userId, CustomPatientForEdit dto) {
        Partient p = partientRepository.getPatientByUserId(userId);
        User user = partientRepository.findUserByPatientId(p.getId());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        p.setFullName(dto.getFullName());
        p.setGender(dto.getGender());
        p.setBirthday(LocalDate.parse(dto.getBirthday()));
        p.setAddress(dto.getAddress());
        p.setImage(dto.getImage());
        try {
            partientRepository.save(p);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean editPatient01(int userId, CustomPatientEditDto dto) {
        Partient p = partientRepository.findById(userId).get();
        User user = partientRepository.findUserByPatientId(p.getId());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        p.setFullName(dto.getFullName());
        p.setGender(dto.getGender());
        p.setBirthday(LocalDate.parse(dto.getBirthday()));
        p.setAddress(dto.getAddress());
        try {
            partientRepository.save(p);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean Create(int userId, CustomPatientForEdit dto) {
        Partient p = new Partient();
        p.setAddress(dto.getAddress());
        p.setImage(dto.getImage());
        p.setFullName(dto.getFullName());
        p.setBirthday(LocalDate.parse(dto.getBirthday()));
        p.setGender(dto.getGender());
        Optional<User> u = userRepository.findById(userId);
        u.ifPresent(user -> p.setUser(mapper.map(u, User.class)));

        try {
            partientRepository.save(p);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // Hien 23/6/2024
    private MedicalDto toMedicalDto(Medical m) {
        MedicalDto dto = mapper.map(m, MedicalDto.class);
        dto.setPatientId(m.getPartient().getId());
        return dto;
    }

    // Hien 23/6/2024
    public List<MedicalDto> getMedicalHistoryByPatientId(Integer patientId) {
        return medicalRepository.findByPartientId(patientId).stream().map(this::toMedicalDto)
                .collect(Collectors.toList());
    }

}
