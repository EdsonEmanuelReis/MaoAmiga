package site.maoamiga.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.maoamiga.Model.Idoso;
import site.maoamiga.Repository.IdosoRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IdosoService {

    private final IdosoRepository idosoRepository;

    public boolean cadastrarIdoso (Idoso idoso){
        if (idoso.getCpf() == null || idosoRepository.existsByCpf(idoso.getCpf())) return false;
        if (idoso.getNome() == null || idoso.getNome().isBlank()) return false;
        if (idoso.getIdade() == null || idoso.getIdade() < 60) return false;
        if (idoso.getTelefone() == null || idoso.getTelefone().isBlank()) return false;
        if (idoso.getEmail() == null || idoso.getEmail().isBlank()) return false;
        if (idoso.getNecessitaAcessibilidade()==null) return false;
        if (idoso.getTamanhoFonte() == null || idoso.getTamanhoFonte() < 16) return false;

        idosoRepository.save(idoso);
        return true;
    }

    public boolean excluirIdoso (Integer id){
        if (!idosoRepository.existsById(id)) return false;
        idosoRepository.deleteById(id);
        return true;
    }

    public Idoso buscarIdIdoso (Integer id){
      return idosoRepository.findById(id).orElse(null);
    }

    public List <Idoso> listarIdoso (){
        return idosoRepository.findAll();
    }

    public boolean atualizarIdoso(Integer id, Idoso atualizado){
        if (!idosoRepository.existsById(id)) return false;
        if (atualizado.getCpf()==null||idosoRepository.existsByCpfAndIdNot(atualizado.getCpf(), id)) return false;
        if (atualizado.getNome() == null || atualizado.getNome().isBlank()) return false;
        if (atualizado.getIdade() == null || atualizado.getIdade() < 60) return false;
        if (atualizado.getTelefone() == null || atualizado.getTelefone().isBlank()) return false;
        if (atualizado.getEmail() == null || atualizado.getEmail().isBlank()) return false;
        if (atualizado.getNecessitaAcessibilidade()==null) return false;
        if (atualizado.getTamanhoFonte() == null || atualizado.getTamanhoFonte() < 16) return false;
        atualizado.setId(id);
        idosoRepository.save(atualizado);
        return true;
    }



}
