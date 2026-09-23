package site.maoamiga.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.maoamiga.Model.RotinaMedicamento;

public interface RotinaMedicamentoRepository extends JpaRepository<RotinaMedicamento, Integer> {
    boolean existsByMedicamento_Id(Integer medicamentoId);
}
