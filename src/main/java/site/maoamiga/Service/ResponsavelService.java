package site.maoamiga.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.maoamiga.Model.Responsavel;
import site.maoamiga.Model.Rotina;
import site.maoamiga.Repository.ResponsavelRepository;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ResponsavelService {

    private final ResponsavelRepository responsavelRepository;

    public boolean cadastrarResponsavel (Responsavel responsavel){
        if (responsavel.getNome()==null||responsavel.getNome().isBlank()) return false;
        if (responsavel.getCpf()==null||responsavel.getCpf().isBlank()) return false;
        if (responsavelRepository.existsByCpf(responsavel.getCpf())) return false;
        if (responsavel.getEmail()==null||responsavel.getEmail().isBlank()) return false;
        if (responsavel.getTelefone()==null||responsavel.getTelefone().isBlank()) return false;
        responsavelRepository.save(responsavel);
        return true;
    }

    public boolean deletarResponsavel (Integer id){
        if (!responsavelRepository.existsById(id)) return false;
        responsavelRepository.deleteById(id);
        return true;
    }

    public Responsavel buscarIdRespo (Integer id){
        return responsavelRepository.findById(id).orElse(null);
    }

    public List <Responsavel> listarResponsavel (){
        return responsavelRepository.findAll();
    }

    public boolean atualizarResponsavel(Integer id, Responsavel atualizado) {

        if (!responsavelRepository.existsById(id)) return false;
        if (atualizado.getNome() == null || atualizado.getNome().isBlank()) return false;
        if (atualizado.getCpf() == null || atualizado.getCpf().isBlank()) return false;
        if (responsavelRepository.existsByCpfAndIdNot(atualizado.getCpf(), id)) return false;
        if (atualizado.getEmail() == null || atualizado.getEmail().isBlank()) return false;
        if (atualizado.getTelefone() == null || atualizado.getTelefone().isBlank()) return false;

        atualizado.setId(id);
        responsavelRepository.save(atualizado);
        return true;
    }



}
