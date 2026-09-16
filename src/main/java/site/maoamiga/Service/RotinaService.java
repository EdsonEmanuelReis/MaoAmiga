package site.maoamiga.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.maoamiga.Model.Rotina;
import site.maoamiga.Repository.RotinaRepository;

import java.util.List;

@RequiredArgsConstructor
@Service

public class RotinaService {

    private final RotinaRepository rotinaRepository;

    public boolean RegistrarRotina (Rotina rotina){
        if (rotina.getDescri().isBlank()) return false;
        rotinaRepository.save(rotina);
        return true;
    }

    public boolean deletarRotina (Integer id){
        if (!rotinaRepository.existsById(id)) return false;
        rotinaRepository.deleteById(id);
        return true;
    }

    public Rotina buscarRotina (Integer id){
        return rotinaRepository.findById(id).orElse(null);
    }

    public List<Rotina> listarRotina (){
       return rotinaRepository.findAll();
    }

    public boolean atualizarRotina (Integer id, Rotina atualizado){
        if (!rotinaRepository.existsById(id)) return false;

        if (atualizado.getDescri() == null || atualizado.getDescri().isBlank()) {
            return false;
        }

        atualizado.setId(id);
        rotinaRepository.save(atualizado);
        return true;
    }

}
