package vn.aptech.backendapi.entities;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "schedules", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "department_id", "slot_id","dayWorking" })
})public class Schedule extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private LocalDate dayWorking;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "slot_id", referencedColumnName = "id")
    private Slot slot;

    private boolean status;

}
