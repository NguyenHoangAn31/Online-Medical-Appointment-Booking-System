package vn.aptech.backendapi.service.Department;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.aptech.backendapi.dto.DepartmentDto;
import vn.aptech.backendapi.entities.Department;
import vn.aptech.backendapi.repository.DepartmentRepository;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper mapper;

    private DepartmentDto toDto(Department d) {
        return mapper.map(d, DepartmentDto.class);
    }

    @Override
    public List<DepartmentDto> findAll() {
        List<Integer> departmentIdsWithDoctors = departmentRepository.findDepartmentIdsWithDoctors();
        List<Department> departments = departmentRepository.findAll();
        for (Department department : departments) {
            if (departmentIdsWithDoctors.contains(department.getId())) {
                department.setStatus(true);
            } else {
                department.setStatus(false);
            }
            departmentRepository.save(department);
        }
        return departments.stream().map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<DepartmentDto> findBySlug(String id) {
        Optional<Department> result = departmentRepository.findByUrl(id);
        return result.map(this::toDto);
    }
    @Override
    public Optional<DepartmentDto> findById(int id) {
        Optional<Department> result = departmentRepository.findById(id);
        return result.map(this::toDto);
    }

    @Override
    public DepartmentDto save(DepartmentDto dto) {
        Department s = mapper.map(dto, Department.class);
        Department result = departmentRepository.save(s);
        return toDto(result);
    }

    @Override
    public boolean deleteById(int id) {
        try {
            departmentRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean changeStatus(int id, int status) {
        Department d = departmentRepository.findById(id).get();
        boolean newStatus = (status == 1) ? false : true;
        d.setStatus(newStatus);
        try {
            departmentRepository.save(d);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
