package site.maoamiga.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalTime;

@Entity
@Table(name = "rotina")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rotina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "descri", nullable = false, length = 350)
    private String descri;

    @Column(name = "medicamento", length = 350)
    private String medicamento;

    private LocalTime horario;

    private Boolean concluida = false;
}