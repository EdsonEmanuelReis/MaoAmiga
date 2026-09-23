package site.maoamiga.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.maoamiga.Enum.ResultadoAtualizarMedicamento;
import site.maoamiga.Enum.ResultadoExclusaoMedicamento;
import site.maoamiga.Model.Medicamento;
import site.maoamiga.Repository.MedicamentoRepository;
import site.maoamiga.Repository.RotinaMedicamentoRepository;
import site.maoamiga.Repository.RotinaRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor

public class MedicamentoService {

    private final MedicamentoRepository medicamentoRepository;
    private final RotinaMedicamentoRepository rotinaMedicamentoRepository;

    public boolean registrarMedicamento (Medicamento medicamento){
        if (medicamento.getNome() == null||medicamento.getNome().isBlank()) return false;
        if (medicamento.getDosagem() == null||medicamento.getDosagem().isBlank()) return false;
        if (medicamento.getQuantidade() == null || medicamento.getQuantidade()<0) return false;
        if (medicamento.getIntervaloHoras() == null || medicamento.getIntervaloHoras()<=0) return false;
        if (medicamento.getValidade() == null || medicamento.getValidade().isBefore(LocalDate.now())) return false;
        medicamentoRepository.save(medicamento);
        return true;
    }

    public ResultadoExclusaoMedicamento excluirMedicamento(Integer id) {

        if (!medicamentoRepository.existsById(id)) {
            return ResultadoExclusaoMedicamento.NAO_ENCONTRADO;
        }

        if (rotinaMedicamentoRepository.existsByMedicamento_Id(id)) {
            return ResultadoExclusaoMedicamento.EM_USO;
        }

        medicamentoRepository.deleteById(id);
        return ResultadoExclusaoMedicamento.EXCLUIDO;
    }

    public Medicamento encontrarMedicamento (Integer id){
        return medicamentoRepository.findById(id).orElse(null);
    }

    public List<Medicamento> listarMedicamento (){
        return medicamentoRepository.findAll();
    }

    public ResultadoAtualizarMedicamento atualizarMedicamento (Integer id, Medicamento atualizado){
        if (!medicamentoRepository.existsById(id)) return null;
        if (atualizado.getNome() == null||atualizado.getNome().isBlank()) return null;
        if (atualizado.getDosagem() == null||atualizado.getDosagem().isBlank()) return null;
        if (atualizado.getQuantidade() == null || atualizado.getQuantidade() < 0) {
            return ResultadoAtualizarMedicamento.QUANTIDADE_INVALIDA;
        }
        if (atualizado.getIntervaloHoras() == null || atualizado.getIntervaloHoras()<=0) return null;
        if (atualizado.getValidade() == null || atualizado.getValidade().isBefore(LocalDate.now())){
            return ResultadoAtualizarMedicamento.VALIDADE_INVALIDA;
        }

        atualizado.setId(id);
        medicamentoRepository.save(atualizado);
        return ResultadoAtualizarMedicamento.ATUALIZADO;
    }
}
