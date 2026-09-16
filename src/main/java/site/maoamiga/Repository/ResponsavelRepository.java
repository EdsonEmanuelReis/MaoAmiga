package site.maoamiga.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.maoamiga.Model.Responsavel;

public interface ResponsavelRepository extends JpaRepository <Responsavel,Integer> {
    boolean existsByCpf(String cpf);
    boolean existsByCpfAndIdNot(String cpf, Integer id);

}
