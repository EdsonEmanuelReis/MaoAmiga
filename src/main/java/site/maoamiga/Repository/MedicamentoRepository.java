package site.maoamiga.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.maoamiga.Model.Medicamento;

public interface MedicamentoRepository extends JpaRepository <Medicamento,Integer> {
}
