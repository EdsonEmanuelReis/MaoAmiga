package site.maoamiga.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.maoamiga.Model.Idoso;

public interface IdosoRepository extends JpaRepository<Idoso,Integer> {
    boolean existsByCpf(String cpf);
    boolean existsByCpfAndIdNot(String cpf, Integer id);


}
