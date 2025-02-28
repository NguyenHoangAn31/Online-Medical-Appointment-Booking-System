package vn.aptech.backendapi.service.Department;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import vn.aptech.backendapi.dto.DepartmentDto;
import vn.aptech.backendapi.entities.Department;
import vn.aptech.backendapi.repository.DepartmentRepository;

@Service
@Slf4j
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper mapper;

    private DepartmentDto toDto(Department d) {
        return mapper.map(d, DepartmentDto.class);
    }

    @Override
    @Transactional
    public List<DepartmentDto> findAll() {
        List<Integer> departmentIdsWithDoctors = departmentRepository.findDepartmentIdsWithDoctors();
        List<Department> departments = departmentRepository.findAll();
        boolean updated = false;

        for (Department department : departments) {
            boolean shouldBeActive = departmentIdsWithDoctors.contains(department.getId());
            if (department.isStatus() != shouldBeActive) {
                department.setStatus(shouldBeActive);
                updated = true;
            }
        }

        if (updated) {
            departmentRepository.saveAll(departments);
        }

        return departments.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public Optional<DepartmentDto> findBySlug(String id) {
        return departmentRepository.findByUrl(id).map(this::toDto);
    }

    @Override
    public Optional<DepartmentDto> findById(int id) {
        return departmentRepository.findById(id).map(this::toDto);
    }

    @Override
    @Transactional
    public DepartmentDto save(DepartmentDto dto) {
        Department entity = mapper.map(dto, Department.class);
        Department savedEntity = departmentRepository.save(entity);
        return toDto(savedEntity);
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        try {
            if (departmentRepository.existsById(id)) {
                departmentRepository.deleteById(id);
                return true;
            } else {
                log.warn("Không tìm thấy khoa có ID: {}", id);
                return false;
            }
        } catch (Exception e) {
            log.error("Lỗi khi xóa khoa có ID {}: {}", id, e.getMessage());
            return false;
        }
    }

    @Override
    @Transactional
    public boolean changeStatus(int id, int status) {
        return departmentRepository.findById(id).map(department -> {
            department.setStatus(status != 1);
            try {
                departmentRepository.save(department);
                return true;
            } catch (Exception e) {
                log.error("Lỗi khi thay đổi trạng thái khoa {}: {}", id, e.getMessage());
                return false;
            }
        }).orElseGet(() -> {
            log.warn("Không tìm thấy khoa có ID: {}", id);
            return false;
        });
    }
}
