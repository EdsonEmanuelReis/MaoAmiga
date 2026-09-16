package site.maoamiga.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.maoamiga.Model.Responsavel;
import site.maoamiga.Service.ResponsavelService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/responsavel")
public class ResponsavelController {

    private final ResponsavelService responsavelService;

    @PostMapping("/cadastrarResponsavel")
    public ResponseEntity<String> cadastrarResponsavel(@RequestBody Responsavel responsavel) {

        if (!responsavelService.cadastrarResponsavel(responsavel)) {
            return ResponseEntity.badRequest().body("Não foi possivel cadastrar responsavel");
        }

        return ResponseEntity.ok("Responsavel cadastrado com sucesso!");
    }

    @GetMapping("/buscarIdResponsavel")
    public ResponseEntity<Responsavel> buscarResponsavel(@RequestParam Integer id) {

        Responsavel responsavel = responsavelService.buscarIdRespo(id);

        if (responsavel == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(responsavel);
    }

    @GetMapping("/listarResponsavel")
    public ResponseEntity<List<Responsavel>> listarResponsavel() {

        return ResponseEntity.ok(responsavelService.listarResponsavel());
    }

    @PutMapping("/atualizarResponsavel")
    public ResponseEntity<Void> atualizarResponsavel(
            @RequestParam Integer id,
            @RequestBody Responsavel atualizado) {

        if (!responsavelService.atualizarResponsavel(id, atualizado)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deletarResponsavel")
    public ResponseEntity<Void> deletarResponsavel(@RequestParam Integer id) {

        if (!responsavelService.deletarResponsavel(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}