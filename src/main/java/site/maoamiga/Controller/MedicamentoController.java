package site.maoamiga.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.maoamiga.Enum.ResultadoAtualizarMedicamento;
import site.maoamiga.Enum.ResultadoExclusaoMedicamento;
import site.maoamiga.Model.Medicamento;
import site.maoamiga.Service.MedicamentoService;

import java.util.List;

@RestController
@RequestMapping("/medicamento")
@RequiredArgsConstructor

public class MedicamentoController {

    private final MedicamentoService medicamentoService;

    @PostMapping("/cadastrarMedicamento")
    public ResponseEntity <String> registrarMedicamento (@RequestBody Medicamento medicamento){
        if(!medicamentoService.registrarMedicamento(medicamento)){
           return ResponseEntity.badRequest().body("Não foi possível registrar o medicamento.");
        }

        return ResponseEntity.ok("Medicamento registrado com sucesso!");

    }

    @DeleteMapping("/deletarMedicamento")
    public ResponseEntity<String> deletarMedicamento(@RequestParam Integer id) {

        ResultadoExclusaoMedicamento resultado = medicamentoService.excluirMedicamento(id);

        if (resultado == ResultadoExclusaoMedicamento.NAO_ENCONTRADO) {
            return ResponseEntity.notFound().build();
        }

        if (resultado == ResultadoExclusaoMedicamento.EM_USO) {
            return ResponseEntity.status(409)
                    .body("Não é possível excluir o medicamento porque ele está associado a uma rotina.");
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscarMedicamento")
    public ResponseEntity<Medicamento> buscarMedicamento(@RequestParam Integer id){

        Medicamento medicamento = medicamentoService.encontrarMedicamento(id);

        if (medicamento == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(medicamento);
    }

    @GetMapping ("/listarMedicamento")
    public ResponseEntity <List<Medicamento>> listarMedicamentos (){
        return ResponseEntity.ok(medicamentoService.listarMedicamento());
    }

    @PutMapping("/atualizarMedicamento")
    public ResponseEntity<String> atualizarMedicamento(
            @RequestParam Integer id,
            @RequestBody Medicamento atualizado){

        ResultadoAtualizarMedicamento resultado =
                medicamentoService.atualizarMedicamento(id, atualizado);

        if (resultado == null) {
            return ResponseEntity.notFound().build();
        }

        if (resultado == ResultadoAtualizarMedicamento.QUANTIDADE_INVALIDA) {
            return ResponseEntity.badRequest()
                    .body("Quantidade inválida.");
        }

        if (resultado == ResultadoAtualizarMedicamento.VALIDADE_INVALIDA) {
            return ResponseEntity.badRequest()
                    .body("Validade inválida.");
        }

        return ResponseEntity.ok("Medicamento atualizado com sucesso!");
    }

}
