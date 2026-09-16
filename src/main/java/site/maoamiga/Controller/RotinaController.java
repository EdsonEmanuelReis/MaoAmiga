package site.maoamiga.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.maoamiga.Model.Rotina;
import site.maoamiga.Service.RotinaService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rotina")
public class RotinaController {

    private final RotinaService rotinaService;

    @PostMapping("/registrarRotina")
    public ResponseEntity<String> registrarRotina(@RequestBody Rotina rotina) {

        if (!rotinaService.RegistrarRotina(rotina)) {
            return ResponseEntity.badRequest()
                    .body("Não foi possível registrar a rotina.");
        }

        return ResponseEntity.ok("Rotina registrada com sucesso!");
    }

    @DeleteMapping("/deletarRotina")
    public ResponseEntity<Void> deletarRotina(@RequestParam Integer id) {

        if (!rotinaService.deletarRotina(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscarIdRotina")
    public ResponseEntity<Rotina> buscarRotina(@RequestParam Integer id) {

        Rotina rotina = rotinaService.buscarRotina(id);

        if (rotina == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(rotina);
    }

    @GetMapping ("/listarRotina")
    public ResponseEntity <List<Rotina>> listarRotina (){
        return ResponseEntity.ok(rotinaService.listarRotina());
    }

    @PutMapping("/atualizarRotina")
    public ResponseEntity<Void> atualizarRotina(
            @RequestParam Integer id,
            @RequestBody Rotina atualizado) {

        if (!rotinaService.atualizarRotina(id, atualizado)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

}